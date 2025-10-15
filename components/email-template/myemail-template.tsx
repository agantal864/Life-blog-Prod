import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Heading,
  Button,
} from "@react-email/components";

interface EmailTemplateProps {
  postTitle: string;
}

export const EmailTemplate = ({ postTitle }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Hello Subscriber,</Heading>
        <Text style={text}>
          Just dropped something new on the blog: <strong>{postTitle}</strong>
        </Text>
        <Text style={text}>
          P.S. Just me rambling on the internet — no agenda, just vibes.
        </Text>
        <Section style={buttonWrapper}>
          <Button style={button} href="https://azis.dev/blog">
            Read Now
          </Button>
        </Section>
        <Text style={footer}>— Zis from Azis Agantal | Life Blog</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f9f9f9",
  padding: "40px 0",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const heading = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#555",
  marginBottom: "20px",
};

const buttonWrapper = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const button = {
  backgroundColor: "#0070f3",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  fontSize: "14px",
  color: "#999",
  textAlign: "center" as const,
};
