export default {
  title: "Privacy Policy",
  lastUpdated: "Last Updated: December 2025",
  backToHome: "Back to Home",
  sections: {
    overview: {
      title: "1. Overview",
      content:
        "Weather Log is a service for managing your weather records. This Privacy Policy explains what information we collect, how we use it, and how we protect it.",
    },
    infoCollect: {
      title: "2. Information We Collect",
      account: "Account Information:",
      accountDesc:
        "Email address, name (information provided when logging in with Google)",
      weather: "Weather Records:",
      weatherDesc:
        "Date, location, weather information, temperature, notes, and other weather-related data entered by users",
      usage: "Usage Information:",
      usageDesc: "Service usage patterns, device information, browser type",
    },
    infoUse: {
      title: "3. How We Use Your Information",
      items: [
        "Providing and maintaining the service",
        "Managing user accounts and authentication",
        "Storing and managing weather records",
        "Improving the service and developing new features",
        "Providing user support and responding to inquiries",
      ],
    },
    googleOauth: {
      title: "4. Google OAuth Login",
      content:
        "When you log in with your Google account, we receive your email address and profile information from Google. We comply with Google's privacy policies and do not store or access your Google account password.",
    },
    infoProtection: {
      title: "5. Information Protection",
      content:
        "We use industry-standard security measures to protect your information. All data is encrypted and stored on secure servers (Supabase).",
    },
    infoSharing: {
      title: "6. Information Sharing",
      content:
        "We do not sell, trade, or share your personal information with third parties. Information may only be shared in limited circumstances when legally required or essential for service provision.",
    },
    userRights: {
      title: "7. Your Rights",
      items: [
        "Access and modify your personal information",
        "Request account deletion",
        "Object to or restrict data processing",
        "Data portability rights",
      ],
    },
    cookies: {
      title: "8. Cookies and Tracking Technologies",
      content:
        "We use cookies and similar technologies to improve user experience. These technologies are used to maintain login status and save user preferences.",
    },
    childrenPrivacy: {
      title: "9. Children's Privacy",
      content:
        "Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.",
    },
    policyChanges: {
      title: "10. Changes to Privacy Policy",
      content:
        "This Privacy Policy may be updated as needed. We will notify users of significant changes.",
    },
    contact: {
      title: "11. Contact",
      content:
        "If you have any questions or concerns about this Privacy Policy, please contact us.",
    },
  },
} as const
