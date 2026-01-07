/**
 * Subscribe email to MailerLite after quiz completion
 * Fire-and-forget pattern - don't block quiz flow if API fails
 */
export async function subscribeToMailerLite(
  email: string,
  resultType: string
): Promise<void> {
  try {
    const response = await fetch('/api/mailerlite-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, resultType }),
    });

    if (!response.ok) {
      throw new Error(`MailerLite API failed: ${response.status}`);
    }
  } catch (error) {
    console.error('MailerLite subscription failed:', error);
    // Don't throw - let quiz continue even if email capture fails
  }
}
