import emailjs from '@emailjs/browser';

/**
 * Collects visitor information including IP, location, and browser details
 */
export const collectVisitorInfo = async () => {
  try {
    // Get IP address and location
    const ipResponse = await fetch('https://ipapi.co/json/');
    const ipData = await ipResponse.json();

    // Get browser information
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'Direct visit',
      url: window.location.href,
    };

    // Combine all visitor information
    const visitorInfo = {
      // IP and Location
      ip: ipData.ip || 'Unable to detect',
      city: ipData.city || 'Unknown',
      region: ipData.region || 'Unknown',
      country: ipData.country_name || 'Unknown',
      countryCode: ipData.country_code || 'Unknown',
      latitude: ipData.latitude || 'Unknown',
      longitude: ipData.longitude || 'Unknown',
      timezone: ipData.timezone || browserInfo.timezone,
      isp: ipData.org || 'Unknown',
      
      // Browser Information
      userAgent: browserInfo.userAgent,
      language: browserInfo.language,
      platform: browserInfo.platform,
      cookieEnabled: browserInfo.cookieEnabled,
      onLine: browserInfo.onLine,
      screenResolution: `${browserInfo.screenWidth}x${browserInfo.screenHeight}`,
      windowSize: `${browserInfo.windowWidth}x${browserInfo.windowHeight}`,
      referrer: browserInfo.referrer,
      url: browserInfo.url,
      visitTime: browserInfo.timestamp,
    };

    return visitorInfo;
  } catch (error) {
    console.error('Error collecting visitor info:', error);
    // Return basic info if API fails
    return {
      ip: 'Unable to detect',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      error: 'Failed to collect full visitor information',
    };
  }
};

/**
 * Sends visitor information via email
 */
export const sendVisitorEmail = async (visitorInfo) => {
  try {
    // Check if EmailJS is configured
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'YOUR_SERVICE_ID' || 
        templateId === 'YOUR_TEMPLATE_ID' || 
        publicKey === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS not configured. Please set up EmailJS credentials. See EMAILJS_SETUP.md for instructions.');
      // Still log visitor info for debugging
      console.log('Visitor Info:', visitorInfo);
      return { success: false, error: 'EmailJS not configured' };
    }

    // Format the email message
    const message = `
New Visitor to SignIt Application

VISITOR INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOCATION & IP:
• IP Address: ${visitorInfo.ip}
• City: ${visitorInfo.city}
• Region/State: ${visitorInfo.region}
• Country: ${visitorInfo.country} (${visitorInfo.countryCode})
• Coordinates: ${visitorInfo.latitude}, ${visitorInfo.longitude}
• Timezone: ${visitorInfo.timezone}
• ISP: ${visitorInfo.isp}

BROWSER INFORMATION:
• User Agent: ${visitorInfo.userAgent}
• Language: ${visitorInfo.language}
• Platform: ${visitorInfo.platform}
• Cookies Enabled: ${visitorInfo.cookieEnabled}
• Online Status: ${visitorInfo.onLine}
• Screen Resolution: ${visitorInfo.screenResolution}
• Window Size: ${visitorInfo.windowSize}

VISIT DETAILS:
• Visit Time: ${visitorInfo.visitTime}
• URL: ${visitorInfo.url}
• Referrer: ${visitorInfo.referrer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated notification from SignIt.
    `.trim();

    // Initialize EmailJS
    emailjs.init(publicKey);

    // Send email
    const response = await emailjs.send(serviceId, templateId, {
      to_email: 'iamasum369@gmail.com',
      subject: `New Visitor to SignIt - ${visitorInfo.country}`,
      message: message,
      visitor_ip: visitorInfo.ip,
      visitor_location: `${visitorInfo.city}, ${visitorInfo.region}, ${visitorInfo.country}`,
      visitor_time: visitorInfo.visitTime,
    });

    console.log('Visitor email sent successfully');
    return { success: true, response };
  } catch (error) {
    console.error('Error sending visitor email:', error);
    // Don't throw error to prevent breaking the app
    return { success: false, error: error.message };
  }
};

/**
 * Main function to track visitor and send email
 */
export const trackVisitor = async () => {
  try {
    const visitorInfo = await collectVisitorInfo();
    const emailResult = await sendVisitorEmail(visitorInfo);
    return { visitorInfo, emailResult };
  } catch (error) {
    console.error('Error in visitor tracking:', error);
    return { error: error.message };
  }
};

