import UnAuthContent from "@components/Auth/UnAuthContent";

import Layout from "@components/Layout";
import SendPasswordResetEmailForm from "@components/User/SendPasswordResetEmailForm";

export default function ForgotPassword() {
    return (
        <Layout>
            <UnAuthContent>
                <SendPasswordResetEmailForm />
            </UnAuthContent>
        </Layout>
    )
}
