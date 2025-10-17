// UI
import SectionLayout from '@/components/layout/SectionLayout';
import { CardLayout } from '@/components/featured/FeatureCard';
import CreatePost from '@/components/createPost/newpost'

function CreateNewPost() {
    return(
        <SectionLayout id="Create_New_Post">
            <CardLayout>
                <CreatePost />
            </CardLayout>
        </SectionLayout>
    )
}

export default CreateNewPost;