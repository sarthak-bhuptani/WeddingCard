import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WEDDING_DATA } from "../data/weddingData";

const EVENT_OPTIONS = ["Haldi", "Sangeet", "Wedding Pheras", "Reception"];

export default function RsvpSection({ onCelebrate }) {
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [selectedEvents, setSelectedEvents] = useState(EVENT_OPTIONS);
  const [note, setNote] = useState("");
  const [submittedMsg, setSubmittedMsg] = useState("");

  const toggleEvent = (ev) => {
    setSelectedEvents((prev) =>
      prev.includes(ev) ? prev.filter((item) => item !== ev) : [...prev, ev]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = name.trim() || "Guest";
    const eventsText = selectedEvents.join(", ") || "All Events";
    setSubmittedMsg(
      `Thank you, ${displayName}! We have noted ${guestCount} guest(s) for ${eventsText}.`
    );
    onCelebrate?.();
  };

  const handleWhatsApp = () => {
    const displayName = name.trim() || "Guest";
    const eventsText = selectedEvents.join(", ") || "All Events";
    const couple = `${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom}`;
    const message =
      `Namaste! RSVP for ${couple}'s Wedding:%0A` +
      `• Name: ${encodeURIComponent(displayName)}%0A` +
      `• Guests: ${encodeURIComponent(guestCount)}%0A` +
      `• Attending: ${encodeURIComponent(eventsText)}%0A` +
      (note.trim() ? `• Blessings/Note: ${encodeURIComponent(note.trim())}` : "");

    window.open(
      `https://wa.me/${WEDDING_DATA.whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <motion.section
      className="section-block"
      aria-label="RSVP"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      <div className="rsvp-panel">
        <span className="section-eyebrow">Kindly Respond</span>
        <h2 className="section-title">RSVP &amp; Blessings</h2>
        <p className="rsvp-subtitle">
          Please confirm your attendance by 10th January 2027 so we can warmly
          host you.
        </p>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guest-name">Your Full Name</label>
              <input
                id="guest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan & Priya Shah"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guest-count">Number of Guests</label>
              <select
                id="guest-count"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Family Members</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Events Attending</label>
            <div className="checkbox-row">
              {EVENT_OPTIONS.map((ev) => {
                const isChecked = selectedEvents.includes(ev);
                return (
                  <label
                    className={`chip-check ${isChecked ? "is-checked" : ""}`}
                    key={ev}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleEvent(ev)}
                    />
                    <span>{ev}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guest-note">
              Blessings or Dietary Note (Optional)
            </label>
            <textarea
              id="guest-note"
              rows="2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Wishing you both a lifetime of happiness..."
            />
          </div>

          <div className="rsvp-actions">
            <button type="submit" className="btn-primary">
              Confirm Attendance
            </button>
            <button
              type="button"
              className="btn-whatsapp"
              onClick={handleWhatsApp}
            >
              <MessageCircle size={17} aria-hidden="true" />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </form>

        {submittedMsg && (
          <div className="rsvp-success" role="status">
            <h3>
              <CheckCircle2 size={20} aria-hidden="true" /> Thank You for Your
              Blessings!
            </h3>
            <p>{submittedMsg}</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
