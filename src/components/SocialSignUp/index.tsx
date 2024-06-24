import GoogleAuth from "./GoogleAuth";
import GitHubAuth from "./GithubAuth";

const SocialSignUp = () => {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <GoogleAuth />
      <GitHubAuth />
    </div>
  );
};

export default SocialSignUp;
