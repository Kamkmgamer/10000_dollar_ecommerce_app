"use client";

export default function NewsletterForm() {
    return (
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" />
            <button type="submit" className="btn btn-sm">Subscribe</button>
        </form>
    );
}
