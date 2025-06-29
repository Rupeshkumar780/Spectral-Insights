const TermsOfService = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-6 pt-20 pb-50">
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-md rounded-md shadow-emerald-800">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          Welcome to Spectral Insights. By accessing or using our platform, you agree to abide by these Terms of Service.
          These terms govern your use of our website, features, and services.
        </p>
        <p className="text-gray-700 mb-4">
          Users are responsible for any content they publish, including ensuring it does not violate any applicable laws,
          infringe upon intellectual property, or spread harmful or deceptive information.
        </p>
        <p className="text-gray-700 mb-4">
          You may not use our platform to harass, threaten, or impersonate others, or post material that is unlawful,
          defamatory, or harmful to others. We reserve the right to remove content or suspend accounts that violate these
          terms at any time without notice.
        </p>
        <p className="text-gray-700 mb-4">
          We may update these terms occasionally, and continued use of the platform implies agreement to any revised terms.
          Users are encouraged to review this page regularly.
        </p>
        <p className="text-gray-700">
            If these terms do not align with your expectations, we respectfully recommend that you refrain from using Spectral Insights.        
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
