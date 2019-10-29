import React, { FC } from 'react';
import { observer } from 'mobx-react';

// Custom
import Layout from '../Layout';
import Header from '../Header';
import Tabs from '../Tabs';
import Main from '../Main';
import Content from '../Content';

// Models
import appModel from '../../models/AppModel';
import photos from '../../models/PhotosModel';
import Modal from '../Modal';


const App: FC = () => {
  return (
    <Layout>
      <Header />
      <Main>
        <Tabs tabs={appModel.tabs} />
        <Content photos={photos} component={appModel.activeComponent} />
      </Main>
      {
        photos.photoToShow
        ? (
          <Modal>
            <img src={photos.photoToShow.url} alt={photos.photoToShow.title}/>
          </Modal>
        )
        : null
      }
    </Layout>
  );
}

export default observer(App);
