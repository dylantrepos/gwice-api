export const getEventsDetailsPrompts = "Extract event information from the provided HTML: Generate the event information in JSON format only (no text) for those fields only (don't create other) :- title- date (timestamp format, start, end)- description (All description, text formatted, not resume)- price- location (name, address, no map field)- website - contact (if exists)- access (if exists)html content :"