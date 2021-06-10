import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import styles from './RenderProfilePicture.scss';

interface IProfilePicProps {
    loginName: string;
    displayName: string;
    getUserProfileUrl?: () => Promise<string>;
}

export function RenderProfilePicture(props: IProfilePicProps) {

    const [profileUrl, setProfileUrl] = React.useState<string>();
    let { displayName, getUserProfileUrl } = props;

    React.useEffect(() => {
        getUserProfileUrl().then(url => {
            setProfileUrl(url);
        });
    }, [props])

    return (
        <div>
            <Persona
                imageUrl={profileUrl}
                text={displayName}
                size={PersonaSize.size32}
                imageAlt={displayName}
                styles={{ primaryText: { fontSize: '14px' }, root: { margin: '10px' } }}
            />
        </div>);
}