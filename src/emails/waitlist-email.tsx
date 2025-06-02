import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { type ContactFormData } from '@/lib/schemas'

interface WaitlistEmailProps {
  data: ContactFormData
}

export const WaitlistEmail = ({ data }: WaitlistEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New waitlist signup from {data.alias}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/images/nav-bar-logo.png`}
              width="120"
              height="36"
              alt="ComfyPlug"
              style={logo}
            />
          </Section>

          <Heading style={h1}>New Waitlist Signup</Heading>

          <Text style={text}>
            Someone just joined the ComfyPlug waitlist! Here are the details:
          </Text>

          <Section style={informationTable}>
            <Text style={informationTableRow}>
              <Text style={informationTableLabel}>Role:</Text>
              <Text style={informationTableValue}>{data.role}</Text>
            </Text>
            <Text style={informationTableRow}>
              <Text style={informationTableLabel}>Alias:</Text>
              <Text style={informationTableValue}>{data.alias}</Text>
            </Text>
            <Text style={informationTableRow}>
              <Text style={informationTableLabel}>Email:</Text>
              <Text style={informationTableValue}>{data.email}</Text>
            </Text>
            <Text style={informationTableRow}>
              <Text style={informationTableLabel}>Phone:</Text>
              <Text style={informationTableValue}>{data.phone}</Text>
            </Text>
            {/* <Text style={informationTableRow}>
              <Text style={informationTableLabel}>Wants Updates:</Text>
              <Text style={informationTableValue}>{data.wantsUpdates ? 'Yes' : 'No'}</Text>
            </Text> */}
          </Section>
          {/* 
          <Text style={text}>
            {data.wantsUpdates && (
              "This person has opted in to receive updates about ComfyPlug's launch and early access opportunities."
            )}
          </Text> */}

          <Text style={footer}>Sent from ComfyPlug Waitlist System</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const logoContainer = {
  marginTop: '32px',
}

const logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#1b4436', // Using your brand green
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
}

const text = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
}

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
  marginTop: '12px',
  marginBottom: '12px',
  width: '100%',
}

const informationTableRow = {
  height: '46px',
}

const informationTableLabel = {
  ...text,
  color: '#333',
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0',
  padding: '0 40px 0 20px',
  width: '100px',
  display: 'inline-block',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: '24px',
}

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

export default WaitlistEmail
