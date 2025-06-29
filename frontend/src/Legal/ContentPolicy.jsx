const ContentPolicy = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-6 pt-20 pb-50">
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-md rounded-md shadow-cyan-900">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Content Policy</h1>
        <p className="text-gray-700 mb-4">
          Spectral Insights is committed to maintaining a respectful and creative environment. This Content Policy
          defines the standards for publishing material on our platform.
        </p>
        <p className="text-gray-700 mb-4">
          We do not allow content that promotes hate, violence, harassment, discrimination, or false information.
          Content must be original and clearly attributed when referencing external sources.
        </p>
        <p className="text-gray-700 mb-4">
          All blog posts are subject to moderation. We may remove or restrict access to content that violates our
          guidelines or applicable laws. Repeated violations may lead to permanent suspension of your account.
        </p>
        <p className="text-gray-700 mb-4">
          Users are encouraged to report content that may be harmful or inappropriate. Our team reviews
          reports promptly and takes appropriate action.
        </p>
        <p className="text-gray-700">
          We reserve the right to update this policy as needed to ensure a safe and welcoming platform for all.
        </p>
      </div>
    </div>
  );
};

export default ContentPolicy;
