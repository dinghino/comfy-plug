namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    /** nodemailer */
    CONTACT_MAIL_HOST: string;
    CONTACT_MAIL_PORT: string;
    CONTACT_MAIL_PASS: string;
    CONTACT_MAIL_USER: string;
    CONTACT_MAIL_TO: string;
    CONTACT_MAIL_TRANSPORTER?: 'gmail' | 'office365';
    /** used by gmail - needs to be the gmail user name */
    CONTACT_MAIL_NAME?: string;
  }
}
