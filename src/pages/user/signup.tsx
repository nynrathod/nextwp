import Layout from "@components/Layout";
import UnAuthContent from "@components/Auth/UnAuthContent";
import SignUpForm from "@components/User/SignUpForm"

export default function SignUp() {
    return (
        <Layout>
            <UnAuthContent>
                <SignUpForm />
            </UnAuthContent>
        </Layout>
    );
}


