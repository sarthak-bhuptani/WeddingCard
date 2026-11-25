import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { WEDDING_DATA } from "../data/weddingData";

const DAY_TABS = [
  { id: "all", label: "All Events" },
  { id: "day1", label: "Day 1 • Jan 23" },
  { id: "day2", label: "Day 2 • Jan 24" },
];

export default function EventsSection() {
  const [activeDay, setActiveDay] = useState("all");

  const filteredEvents =
    activeDay === "all"
      ? WEDDING_DATA.events
      : WEDDING_DATA.events.filter((ev) => ev.day === activeDay);

  return (
    <motion.section
      className="section-block"
      aria-label="Wedding Itinerary"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      <div className="section-header">
        <span className="section-eyebrow">Celebration Schedule</span>
        <h2 className="section-title">Wedding Festivities</h2>
      </div>

      <div
        className="event-tabs"
        role="tablist"
        aria-label="Filter wedding events by day"
      >
        {DAY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeDay === tab.id}
            className={`tab-btn ${activeDay === tab.id ? "active" : ""}`}
            onClick={() => setActiveDay(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map((ev) => (
          <motion.article
            key={ev.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`event-card ${ev.featured ? "featured" : ""}`}
          >
            <div className="event-icon" aria-hidden="true">
              {ev.emoji}
            </div>
            <span className="event-day-tag">{ev.dayLabel}</span>
            <h3 className="event-name">{ev.name}</h3>
            <p className="event-desc">{ev.description}</p>
            <div className="event-meta">
              <span>
                <strong>Venue:</strong> {ev.venue}
              </span>
              <span>
                <strong>Attire:</strong> {ev.attire}
              </span>
            </div>
            <a
              href={ev.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              <MapPin size={15} aria-hidden="true" />
              <span>View on Google Maps</span>
            </a>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
