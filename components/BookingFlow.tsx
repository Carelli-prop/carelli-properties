"use client";

import { useEffect, useRef, useState } from "react";
import { site, apartments } from "@/content/site";
import Picker from "./Picker";

type BookableDate = { iso: string; label: string };

export default function BookingFlow({
  initialApartment,
}: {
  initialApartment?: string;
}) {
  const [step, setStep] = useState(1);
  const [apartment, setApartment] = useState(initialApartment || "");
  const [dates, setDates] = useState<BookableDate[]>([]);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevCan = useRef(false);

  useEffect(() => {
    fetch("/api/dates")
      .then((r) => r.json())
      .then((data) => {
        setDates(data.dates);
        if (data.dates.length > 0) setDate(data.dates[0].iso);
      });
  }, []);

  useEffect(() => {
    if (!apartment || !date) return;
    setLoadingSlots(true);
    setTime("");
    setError("");
    fetch(`/api/slots?apartment=${apartment}&date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.available);
        if (data.available.length > 0) {
          setTime(data.available[0]);
        } else {
          setError("Fully booked for this day. Please choose another date.");
        }
      })
      .finally(() => setLoadingSlots(false));
  }, [apartment, date]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step, success]);

  const canContinue =
    (step === 1 && !!apartment) ||
    (step === 2 && !!date) ||
    (step === 3 && !!time && !loadingSlots && !error) ||
    step === 4;

  useEffect(() => {
    if (canContinue && !prevCan.current && step < 4) {
      setPulse(true);
      const t = window.setTimeout(() => setPulse(false), 1000);
      prevCan.current = canContinue;
      return () => window.clearTimeout(t);
    }
    prevCan.current = canContinue;
  }, [canContinue, step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apartment,
          date,
          time,
          name,
          email,
          phone,
          note,
          website,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else if (data.error === "slot-taken" && data.next) {
        setError(
          `That slot was just taken. The next available is ${data.next.label} at ${data.next.time}.`
        );
        if (data.next.iso !== date) setDate(data.next.iso);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedFlat = apartments.find((a) => a.id === apartment);
  const selectedDate = dates.find((d) => d.iso === date);

  const summaryParts = [
    apartment ? (apartment === "88a" ? "Flat 88A" : "Flat 88B") : "",
    step >= 3 ? selectedDate?.label ?? "" : "",
    step >= 4 ? time : "",
  ].filter(Boolean);

  if (success && selectedFlat && selectedDate) {
    const waText = encodeURIComponent(
      `Hi Matt, I just booked a viewing for ${selectedFlat.label} on ${selectedDate.label} at ${time}. Looking forward to it!`
    );
    return (
      <div className="card success-card">
        <h1>Viewing requested</h1>
        <p className="lead">
          Thank you. Your request for {selectedFlat.label} is with us.
        </p>

        <div className="summary-grid">
          <div>
            <strong>When:</strong> {selectedDate.label} at {time}
          </div>
          <div>
            <strong>Who:</strong> {name}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
          {phone && (
            <div>
              <strong>Phone:</strong> {phone}
            </div>
          )}
        </div>

        <h2>What happens next</h2>
        <p>Matt will reply to {email} within one working day to confirm.</p>
        <p>
          If you need to change anything before then, WhatsApp him directly
          using the button below.
        </p>

        <div className="success-actions">
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${waText}`}
            className="btn btn-secondary btn-big"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message Matt on WhatsApp
          </a>
          <a href="/" className="btn-text">
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="step-indicator">Step {step} of 4</div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${step * 25}%` }} />
      </div>
      {summaryParts.length > 0 && (
        <p className="meta step-summary">{summaryParts.join(" · ")}</p>
      )}

      <div className="step-content" key={step}>
        {step === 1 && (
          <>
            <h1>Choose an apartment</h1>
            <div className="choice-group">
              {apartments.map((flat) => (
                <button
                  type="button"
                  key={flat.id}
                  className={`choice-btn ${apartment === flat.id ? "is-active" : ""}`}
                  onClick={() => setApartment(flat.id)}
                >
                  <strong>{flat.label}</strong>
                  <span>{flat.summary}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Choose a date</h1>
            <Picker
              label="Available dates"
              options={dates.map((d) => ({ value: d.iso, label: d.label }))}
              value={date}
              onChange={setDate}
              emptyMessage="No dates available right now."
            />
          </>
        )}

        {step === 3 && (
          <>
            <h1>Choose a time</h1>
            {loadingSlots ? (
              <div className="skeleton">Loading slots...</div>
            ) : (
              <Picker
                label="Available times"
                options={slots.map((s) => ({ value: s, label: s }))}
                value={time}
                onChange={setTime}
                emptyMessage="Fully booked for this day."
              />
            )}
            {error && <p className="error-text">{error}</p>}
          </>
        )}

        {step === 4 && (
          <>
            <h1>Your details</h1>
            <p className="meta">Matt will confirm your viewing by email.</p>
            <div className="form-fields">
              <label>
                Name
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label>
                Phone (optional)
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </label>
              <label>
                Note (optional)
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="error-text">{error}</p>}
          </>
        )}
      </div>

      <label className="hp" aria-hidden="true">
        Leave this field empty
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="step-actions">
        {step > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            className={`btn btn-primary ${pulse ? "btn-attention" : ""}`}
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Requesting..." : "Request viewing"}
          </button>
        )}
      </div>
    </form>
  );
}
