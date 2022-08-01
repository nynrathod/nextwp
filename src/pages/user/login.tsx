
import UnAuthContent from "@components/Auth/UnAuthContent";

import Layout from "@components/Layout";
import LogInForm from "@components/User/LogInForm";

export default function LogIn() {
    return (
        <Layout>
            <UnAuthContent>
                <LogInForm />
            </UnAuthContent>
        </Layout>
    );
}


