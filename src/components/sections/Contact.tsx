import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Contact</h2>
      <Separator className="my-4" />

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        Have a question or want to work together? Fill out the form below and I'll get
        back to you as soon as possible.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="user_name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <Input
              id="user_name"
              name="user_name"
              placeholder="Your name"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="user_email"
              name="user_email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            placeholder="What is this about?"
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message..."
            rows={6}
            required
            className="resize-none bg-background"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </section>
  );
}
