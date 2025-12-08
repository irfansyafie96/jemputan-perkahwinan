exports.handler = async (event, context) => {
  // Verify it's a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const payload = JSON.parse(event.body);

    // Optional: Add basic validation
    if (!payload.name || !payload.attendance || !payload.pax) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields',
          received: payload
        })
      };
    }

    // Make request to your Google Apps Script
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your script expects
      },
      body: JSON.stringify(payload)
    });

    // Get the response from Google Apps Script
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If response is not JSON, return text response
      const textResponse = await response.text();
      console.error('Google Apps Script non-JSON response:', textResponse);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          result: 'success',
          message: 'Data sent to Google Apps Script, but response format unexpected',
          rawResponse: textResponse
        })
      };
    }

    return {
      statusCode: response.status,
      body: JSON.stringify({
        result: 'success',
        googleScriptResponse: data,
        receivedData: payload
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      })
    };
  }
};