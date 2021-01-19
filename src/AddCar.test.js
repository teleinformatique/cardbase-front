import React from 'react';
import AddCar from './components/AddCar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

describe('<AddCar />', () => {
    it('render five <TextInput /> components', () => {
        const wrapper = shallow(<AddCar />)
        console.log(wrapper)
        expect(wrapper.is('.test')).toBe(true)
    })
})