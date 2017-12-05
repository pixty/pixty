import React from 'react';
import styled from 'styled-components';
import { mainColor } from './Colors';

const ProfileInfo = styled.div`
  overflow: hidden;
  height: 105px;
  padding: 0px;
  background: ${ props => props.isSelected ? '#fff' : 'rgba(0,0,0,0.1)' };
  display: flex;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid ${props => props.active ? mainColor : 'transparent'};
  margin: 0 5px;
  cursor: ${ props => props.zoomIn ? 'zoom-in' : 'zoom-out' };
`;

const AvatarContainer = styled.div`
  display: flex;
  flex: 1;
`;

const PicturesContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
`;

const PicturesContainerScroll = styled.div`
  width: ${props => props.count * 114 + 'px'};
  -webkit-overflow-scrolling: touch;
`;

const NoAattributes = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Match = ({id, avatarUrl, active}) => <div>
  <Avatar alt={id} src={avatarUrl || '/images/missing.png'} active={active} />
</div>;

export {ProfileInfo, Avatar, AvatarContainer, PicturesContainer, PicturesContainerScroll, NoAattributes, Match};
