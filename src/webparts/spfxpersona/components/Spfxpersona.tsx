import * as React from 'react';
import styles from './Spfxpersona.module.scss';
import { ISpfxpersonaProps } from './ISpfxpersonaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import { RenderProfilePicture } from '../Common/Components/RenderProfilePicture/RenderProfilePicture'

export interface ISpfxpersonaWebPartState {
  users: any[]
}

export default class Spfxpersona extends React.Component<ISpfxpersonaProps, ISpfxpersonaWebPartState> {

  constructor(props: ISpfxpersonaProps) {
    super(props);
    this.state = {
      users: []
    }
  }

  private getUserProfileUrl = async (loginName: string) => {
    const userPictureUrl = await sp.profiles.getUserProfilePropertyFor(loginName, 'PictureURL');
    return userPictureUrl;
  }

  public async getSiteUsers() {
    const grpUsers = await sp.web.siteGroups.getById(3).users();
    console.log("GRP USERS =>", grpUsers)
    this.setState({ users: grpUsers })
  }

  public componentDidMount() {
    this.getSiteUsers()
  }

  public render(): React.ReactElement<ISpfxpersonaProps> {
    return (
      <div className={styles.spfxpersona}>
        <span>USERS WITH PERSONA CARD</span>
        {this.state.users.map(m =>
          <RenderProfilePicture
            loginName={m.LoginName}
            displayName={m.Title}
            getUserProfileUrl={() => this.getUserProfileUrl(m.LoginName)}  ></RenderProfilePicture>
        )}
      </div>
    );
  }
}
