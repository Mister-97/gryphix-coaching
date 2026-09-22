import type { BlogPost } from "@/lib/supabase";

// Stub until Will/Josh gets a Resend API key set up (RESEND_API_KEY env var
// not yet configured -- see project_gryphix memory). Once it exists, this
// should fetch all subscribers and send each one an email pointing at the
// new post, using resend's batch send endpoint (respect their rate limits --
// batch, don't loop one email at a time for a large list).
export async function notifySubscribersOfNewPost(post: BlogPost) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[notify] RESEND_API_KEY not set, skipping notification for "${post.title}"`);
    return { sent: 0, skipped: true };
  }
  // TODO: wire in Resend once a key exists.
  return { sent: 0, skipped: true };
}
