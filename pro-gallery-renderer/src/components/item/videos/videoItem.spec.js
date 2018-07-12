'use strict';

import GalleryDriver from '../../../../test/drivers/reactDriver';
import {testVideos} from '../../../../test/images-mock';
import React from 'react';
import sinon from 'sinon';
import VideoItem from './videoItem';
import {expect} from 'chai';
import utils from '../../../utils';

describe('Video Item ', () => {

  let driver;
  let sampleItem;
  let sampleItemViewProps;
  let stub;

  beforeEach(() => {
    driver = new GalleryDriver();
    sampleItem = testVideos[0];
    sampleItemViewProps = driver.props.itemView(sampleItem);
    Object.assign(sampleItemViewProps, {
      playing: false,
      onMount: () => {},
      onUnmount: () => {}
    });
  });

  it('should create PlayerElement if video can play in gallery', () => {
    //utils.isMobile() && itemClick !== 'expand'
    stub = sinon.stub(utils, 'isMobile').returns(true);
    Object.assign(sampleItemViewProps.styleParams, {
      itemClick: 'link'
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);

    Object.assign(sampleItemViewProps.styleParams, {
      itemClick: 'nothing'
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);
    stub.restore();

    //!utils.isMobile() && itemClick !== 'expand'
    stub = sinon.stub(utils, 'isMobile').returns(false);
    Object.assign(sampleItemViewProps.styleParams, {
      itemClick: 'link',
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);
    Object.assign(sampleItemViewProps.styleParams, {
      itemClick: 'nothing',
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);
    stub.restore();

    //!utils.isMobile() && videoPlay !== 'onClick'
    stub = sinon.stub(utils, 'isMobile').returns(false);
    Object.assign(sampleItemViewProps.styleParams, {
      videoPlay: 'hover',
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);
    Object.assign(sampleItemViewProps.styleParams, {
      videoPlay: 'auto',
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('video_container-video-player-element').length).to.equal(1);
    expect(driver.find.hook('video_container-image-element').length).to.equal(0);
    stub.restore();
  });

  it('source should have right src', () => {
    Object.assign(sampleItemViewProps, {
      videoUrl: ''
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.selector('ReactPlayer').props().url).equal(sampleItemViewProps.resized_url.mp4);
    expect(driver.find.selector('ReactPlayer').props().fileConfig.attributes.poster).equal(sampleItemViewProps.resized_url.img);
    Object.assign(sampleItemViewProps, {
      videoUrl: 'https://www.youtube.com/watch?v=2J5GzHoKl1Q'
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.selector('ReactPlayer').props().url).equal('https://www.youtube.com/watch?v=2J5GzHoKl1Q');
    expect(driver.find.selector('ReactPlayer').props().fileConfig.attributes.poster).equal(sampleItemViewProps.resized_url.img);
  });

  it('video controls should appear if not hidePlay', () => {
    Object.assign(sampleItemViewProps, {
      hidePlay: false
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('play-triangle').length).to.equal(1);
    expect(driver.find.hook('play-background').length).to.equal(1);
    Object.assign(sampleItemViewProps, {
      hidePlay: true
    });
    driver.mount(VideoItem, sampleItemViewProps);
    expect(driver.find.hook('play-triangle').length).to.equal(0);
    expect(driver.find.hook('play-background').length).to.equal(0);
  });
});