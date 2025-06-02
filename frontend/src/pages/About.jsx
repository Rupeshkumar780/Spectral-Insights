import { useAuth } from "../context/AuthProvider";

const About = () => {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div className="container max-w-4xl mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>

      <p>
        Hey! I’m{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.user?.name || "Rupesh Kumar"}
        </strong>
        , an engineering undergrad, full-stack developer, and someone who believes in the power of building — whether it's products, teams, or better habits.
      </p>

      <p>
        I'm currently a Pre-Final Year Student pursuing Electrical Engineering at{" "}
        <strong>IIT (ISM) Dhanbad</strong>. College life here has been a journey filled with challenges, friendships, late-night debugging sessions, and moments of self-discovery. Being surrounded by people who are equally driven and curious constantly pushes me to grow — both technically and personally.
      </p>

      <p>
        As a full-stack developer, I enjoy building efficient and user-friendly web applications. I mainly work with technologies like HTML, CSS, JavaScript, and React.js on the frontend, while using Node.js, Express.js, and Firebase on the backend. For databases, I’ve worked with MongoDB and Firestore, and I also use tools like Git, Cloudinary, and a bit of AutoCAD and Ltspice from my engineering background. My programming foundation is built on C and C++, with JavaScript being my go-to language for most projects.
      </p>

      <p>
        Outside of academics and development,  you’ll usually find me on the basketball court.. The game keeps me active and teaches me patience, focus, and teamwork, which I try to carry into my daily life and code. I believe in staying grounded, improving every day, and contributing to something meaningful.
      </p>

      <p>
        Going forward, I hope to keep learning, explore real-world projects, and grow both as a developer and as a person. Thank you for visiting this page — feel free to explore the rest of the site!
      </p>
    </div>
  );
};

export default About;
