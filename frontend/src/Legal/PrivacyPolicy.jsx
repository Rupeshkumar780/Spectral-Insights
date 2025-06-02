const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At Spectral Insights, we value your privacy. This policy outlines how we collect, use, and protect your
          information.
        </p>
        <p className="text-gray-700 mb-4">
          When you register an account, we collect information such as your name, email address, and profile photo.
          This data is used to personalize your experience and is never shared with third parties without your consent,
          unless required by law.
        </p>
        <p className="text-gray-700 mb-4">
          We use cookies to maintain login sessions, track usage metrics, and improve our services. You may disable
          cookies through your browser, but this may affect functionality.
        </p>
        <p className="text-gray-700 mb-4">
          We implement industry-standard security measures to protect your data. However, no system is fully immune to
          breaches, and we encourage users to use strong passwords and maintain good account hygiene.
        </p>
        <p className="text-gray-700">
          If you wish to delete your account or request access to your data, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
