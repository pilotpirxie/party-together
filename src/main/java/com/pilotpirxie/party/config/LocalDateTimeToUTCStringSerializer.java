package com.pilotpirxie.party.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.io.Serial;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeToUTCStringSerializer extends StdSerializer<LocalDateTime> {

    @Serial
    private static final long serialVersionUID = 1L;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;

    public LocalDateTimeToUTCStringSerializer() {
        super(LocalDateTime.class);
    }

    @Override
    public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        String formattedDate = value.atOffset(ZoneOffset.UTC).format(formatter);
        gen.writeString(formattedDate);
    }
}