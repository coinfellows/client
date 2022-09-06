import React from "react";
import ProfileCard from '../ProfileCard';
import DevProfiles from '../DevProfiles.json';
import {UnsignedLayout} from '../components/unsigned-layout';

class AboutUs extends React.Component {

    profile = DevProfiles.map((value) => {
        return (
            <ProfileCard
              key={value._id}
              image={value.image_url}
              name={value.name}
              description={value.description}
              linkedin={value.linkedin}
              github={value.github}
            />
        );
    });

  render() {

    return (
      <>
        <UnsignedLayout>
          {this.profile}
        </UnsignedLayout>
      </>
    );
  }
}

export default AboutUs;