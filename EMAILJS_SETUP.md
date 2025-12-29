# EmailJS Setup Instructions

This application uses EmailJS to send visitor tracking emails. Follow these steps to set it up:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Visitor to SignIt - {{visitor_location}}

New Visitor to SignIt Application

VISITOR INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOCATION & IP:
• IP Address: {{visitor_ip}}
• Location: {{visitor_location}}
• Visit Time: {{visitor_time}}

Full Details:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated notification from SignIt.
```

4. Set the **To Email** field to: `iamasum369@gmail.com`
5. Copy your **Template ID**

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your EmailJS credentials:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Restart your development server

## Testing

After setup, every visitor to your application will automatically send an email to `iamasum369@gmail.com` with their:
- IP address
- Location (city, region, country)
- Coordinates
- Browser information
- Visit time and URL

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- All features needed for this use case

For production with higher traffic, consider upgrading to a paid plan.

