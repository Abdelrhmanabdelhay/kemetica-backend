import { Resend } from 'resend';


/**
 * Sends a styled inquiry notification email via Resend
 * @param {Object} inquiry - The saved Mongoose inquiry document
 */
export const sendInquiryEmail = async (inquiry) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const dateFrom = inquiry.travelDateFrom
    ? new Date(inquiry.travelDateFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified';

  const dateTo = inquiry.travelDateTo
    ? new Date(inquiry.travelDateTo).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified';

  const fullPhone = inquiry.phone
    ? `${inquiry.phoneCountryCode || ''} ${inquiry.phone}`.trim()
    : 'Not provided';

  const tourInfo = inquiry.tourTitle
    ? `<tr>
        <td style="padding:10px 16px;background:#fdf8f0;border-bottom:1px solid #f0e8d5;">
          <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Tour of Interest</span><br/>
          <span style="font-size:15px;color:#1a1a1a;font-weight:600;margin-top:4px;display:block;">${inquiry.tourTitle}</span>
        </td>
      </tr>`
    : '';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Inquiry - Kemitica Tours</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f5f0e8;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1009 0%,#3d2b10 100%);padding:36px 32px;text-align:center;">
              <h1 style="margin:0 0 6px;font-size:26px;font-weight:700;color:#B88F45;letter-spacing:2px;text-transform:uppercase;">Kemitica Tours</h1>
              <p style="margin:0;font-size:13px;color:#c9a96b;letter-spacing:1px;text-transform:uppercase;">New Booking Inquiry</p>
              <div style="margin:16px auto 0;width:48px;height:2px;background:#B88F45;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background:#B88F45;padding:12px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#fff;font-weight:600;letter-spacing:0.5px;">
                A new customer has submitted an inquiry
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 16px;">
              <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.6;">
                A new inquiry has been received. Please review the details below and follow up at your earliest convenience.
              </p>

              <!-- Data Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0e8d5;border-radius:8px;overflow:hidden;">

                <!-- Section: Personal Info -->
                <tr>
                  <td style="background:#3d2b10;padding:8px 16px;">
                    <span style="font-size:11px;color:#B88F45;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Personal Information</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#fff;border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Full Name</span><br/>
                    <span style="font-size:16px;color:#1a1a1a;font-weight:700;margin-top:4px;display:block;">${inquiry.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#fdf8f0;border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email Address</span><br/>
                    <a href="mailto:${inquiry.email}" style="font-size:15px;color:#B88F45;text-decoration:none;font-weight:600;margin-top:4px;display:block;">${inquiry.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#fff;border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Phone Number</span><br/>
                    <a href="tel:${fullPhone.replace(/\s/g, '')}" style="font-size:15px;color:#1a1a1a;text-decoration:none;font-weight:600;margin-top:4px;display:block;">${fullPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#fdf8f0;border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Nationality</span><br/>
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;margin-top:4px;display:block;">${inquiry.nationality || 'Not specified'}</span>
                  </td>
                </tr>

                <!-- Section: Tour Info -->
                <tr>
                  <td style="background:#3d2b10;padding:8px 16px;">
                    <span style="font-size:11px;color:#B88F45;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Tour Information</span>
                  </td>
                </tr>
                ${tourInfo}
                <tr>
                  <td style="padding:10px 16px;background:#${inquiry.tourTitle ? 'fff' : 'fdf8f0'};border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Travel Date (From)</span><br/>
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;margin-top:4px;display:block;">${dateFrom}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#${inquiry.tourTitle ? 'fdf8f0' : 'fff'};border-bottom:1px solid #f0e8d5;">
                    <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Travel Date (To)</span><br/>
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;margin-top:4px;display:block;">${dateTo}</span>
                  </td>
                </tr>

                <!-- Section: Group Size -->
                <tr>
                  <td style="background:#3d2b10;padding:8px 16px;">
                    <span style="font-size:11px;color:#B88F45;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Group Size</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;background:#fff;border-bottom:1px solid #f0e8d5;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 16px;width:50%;border-right:1px solid #f0e8d5;">
                          <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Adults</span><br/>
                          <span style="font-size:22px;color:#B88F45;font-weight:700;margin-top:4px;display:block;">${inquiry.adults ?? 1}</span>
                        </td>
                        <td style="padding:10px 16px;width:50%;">
                          <span style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Children (under 12)</span><br/>
                          <span style="font-size:22px;color:#B88F45;font-weight:700;margin-top:4px;display:block;">${inquiry.children ?? 0}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Section: Message -->
                <tr>
                  <td style="background:#3d2b10;padding:8px 16px;">
                    <span style="font-size:11px;color:#B88F45;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Requirements and Message</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px;background:#fdf8f0;">
                    <p style="margin:0;font-size:14px;color:#444;line-height:1.7;font-style:italic;">${inquiry.message || 'No specific requirements provided.'}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <a href="mailto:${inquiry.email}?subject=Re: Your Inquiry - Kemitica Tours"
                 style="display:inline-block;background:#B88F45;color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                Reply to ${inquiry.fullName.split(' ')[0]}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f0e8;padding:20px 32px;text-align:center;border-top:1px solid #e8dcc8;">
              <p style="margin:0 0 4px;font-size:12px;color:#999;">This is an automated notification from your website.</p>
              <p style="margin:0;font-size:12px;color:#999;">Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Cairo', dateStyle: 'full', timeStyle: 'short' })} (Cairo Time)</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: 'Kemitica Tours <onboarding@resend.dev>',
    to: process.env.EMAIL_TO,
    subject: `New Inquiry from ${inquiry.fullName} - Kemitica Tours`,
    html,
    text: `
New Inquiry Received - Kemitica Tours
======================================
Name:        ${inquiry.fullName}
Email:       ${inquiry.email}
Phone:       ${fullPhone}
Nationality: ${inquiry.nationality || 'Not specified'}
Tour:        ${inquiry.tourTitle || 'General inquiry'}
From:        ${dateFrom}
To:          ${dateTo}
Adults:      ${inquiry.adults ?? 1}
Children:    ${inquiry.children ?? 0}

Message:
${inquiry.message || 'No message provided.'}
======================================
Received: ${new Date().toISOString()}
    `.trim(),
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }

  return data;
};
