const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Starting generation process...');
        
        // Parse form data
        const contentType = event.headers['content-type'] || '';
        
        if (!contentType.includes('multipart/form-data')) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid content type. Expected multipart/form-data' })
            };
        }

        // Get boundary from content-type
        const boundary = contentType.split('boundary=')[1];
        if (!boundary) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'No boundary found in content-type' })
            };
        }

        // Convert body to buffer
        const bodyBuffer = Buffer.from(
            event.body, 
            event.isBase64Encoded ? 'base64' : 'utf8'
        );
        
        console.log('Parsing multipart data...');
        const parts = parseMultipart(bodyBuffer, boundary);
        
        const name = parts.name;
        const comment = parts.comment;
        const imageBuffer = parts.image?.buffer;
        const imageName = parts.image?.filename || 'image.jpg';

        if (!name || !comment || !imageBuffer) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Missing required fields',
                    received: {
                        name: !!name,
                        comment: !!comment,
                        image: !!imageBuffer
                    }
                })
            };
        }

        console.log('Step 1: Uploading image to Catbox...');
        // Step 1: Upload image to Catbox
        const catboxFormData = new FormData();
        catboxFormData.append('reqtype', 'fileupload');
        catboxFormData.append('fileToUpload', imageBuffer, {
            filename: imageName,
            contentType: 'image/jpeg'
        });

        const catboxResponse = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: catboxFormData,
            headers: catboxFormData.getHeaders()
        });

        const imageUrl = await catboxResponse.text();
        
        if (!imageUrl.startsWith('http')) {
            throw new Error('Failed to upload image to Catbox: ' + imageUrl);
        }
        console.log('Image uploaded:', imageUrl);

        console.log('Step 2: Generating fake FB quote...');
        // Step 2: Generate fake FB quote
        const fakeFbUrl = `https://api.zenzxz.my.id/api/maker/fakefb?name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}&ppurl=${encodeURIComponent(imageUrl)}`;
        
        const fakeFbResponse = await fetch(fakeFbUrl);
        
        if (!fakeFbResponse.ok) {
            throw new Error('Failed to generate fake FB quote');
        }
        
        const fakeFbBuffer = await fakeFbResponse.buffer();
        console.log('Fake FB quote generated');

        console.log('Step 3: Uploading result to Catbox...');
        // Step 3: Upload result to Catbox
        const resultFormData = new FormData();
        resultFormData.append('reqtype', 'fileupload');
        resultFormData.append('fileToUpload', fakeFbBuffer, {
            filename: 'fakefb.jpg',
            contentType: 'image/jpeg'
        });

        const resultCatboxResponse = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: resultFormData,
            headers: resultFormData.getHeaders()
        });

        const resultUrl = await resultCatboxResponse.text();

        if (!resultUrl.startsWith('http')) {
            throw new Error('Failed to upload result to Catbox: ' + resultUrl);
        }
        console.log('Result uploaded:', resultUrl);

        console.log('Step 4: Upscaling image...');
        // Step 4: Upscale image
        const upscaleUrl = `https://api-faa.my.id/faa/superhd?url=${encodeURIComponent(resultUrl)}`;
        
        const upscaleResponse = await fetch(upscaleUrl);
        
        if (!upscaleResponse.ok) {
            console.log('Upscale failed, using non-upscaled version');
            // If upscale fails, return the non-upscaled version
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ imageUrl: resultUrl })
            };
        }
        
        const upscaleBuffer = await upscaleResponse.buffer();
        console.log('Image upscaled');

        console.log('Step 5: Uploading final result...');
        // Step 5: Upload final result to Catbox
        const finalFormData = new FormData();
        finalFormData.append('reqtype', 'fileupload');
        finalFormData.append('fileToUpload', upscaleBuffer, {
            filename: 'fakefb-hd.jpg',
            contentType: 'image/jpeg'
        });

        const finalCatboxResponse = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: finalFormData,
            headers: finalFormData.getHeaders()
        });

        const finalUrl = await finalCatboxResponse.text();

        if (!finalUrl.startsWith('http')) {
            throw new Error('Failed to upload final result to Catbox: ' + finalUrl);
        }
        console.log('Final result uploaded:', finalUrl);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                imageUrl: finalUrl,
                success: true 
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: error.message || 'Internal server error',
                success: false
            })
        };
    }
};

// Simple multipart parser
function parseMultipart(buffer, boundary) {
    const parts = {};
    const boundaryBuffer = Buffer.from(`--${boundary}`);
    const sections = [];
    
    let start = 0;
    while (true) {
        const index = buffer.indexOf(boundaryBuffer, start);
        if (index === -1) break;
        if (start !== 0) sections.push(buffer.slice(start, index));
        start = index + boundaryBuffer.length;
    }

    for (const section of sections) {
        const headerEnd = section.indexOf('\r\n\r\n');
        if (headerEnd === -1) continue;
        
        const header = section.slice(0, headerEnd).toString();
        const content = section.slice(headerEnd + 4, section.length - 2);
        
        const nameMatch = header.match(/name="([^"]+)"/);
        if (!nameMatch) continue;
        
        const fieldName = nameMatch[1];
        
        if (fieldName === 'image') {
            const filenameMatch = header.match(/filename="([^"]+)"/);
            parts[fieldName] = {
                buffer: content,
                filename: filenameMatch ? filenameMatch[1] : 'image.jpg'
            };
        } else {
            parts[fieldName] = content.toString().trim();
        }
    }
    
    return parts;
          }
