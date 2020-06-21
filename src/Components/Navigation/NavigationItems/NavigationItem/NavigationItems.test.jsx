import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../NavigationItems';
import NavigationItem from './NavigationItem';


configure ({adapter: new Adapter() }); 

describe('<NavigationItems', () => {

    let wrapper;
    beforeEach( () => {
        wrapper = shallow(<NavigationItems />)
    });
    it('Should Render two <Navigationitem /> element if not Auth', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should Render three <Navigationitem /> element if Auth', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});
