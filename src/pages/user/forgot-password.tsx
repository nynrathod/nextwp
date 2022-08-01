import Layout from "@components/Layout";
import UnAuthContent from "@components/Auth/UnAuthContent";
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
