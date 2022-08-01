import Layout from "@components/Layout";
import AuthContent from "@components/Auth/AuthContent";

export default function MembersContent() {
    return (
        <Layout>
            <AuthContent>
                <p>Here is some top-secret members-only content!</p>
            </AuthContent>
        </Layout>
    );
}
