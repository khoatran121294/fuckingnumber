import React from 'react'
import BoardItem from './BoardItem'
import Enzyme , { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        isFirstCol: true,
        isMatching: false,
        isWinnerItem: false,
        value: 9
    }
    const enzymeWrapper = mount(<BoardItem {...props} />)
    return {
        props,
        enzymeWrapper
    }
}

describe('component BoardItem', () => {
    it('should render self with correct properties', () => {
        const { enzymeWrapper, props } = setup()
        
        expect(enzymeWrapper.find('.text-center .item').exists()).toBe(true)
        expect(enzymeWrapper.find('.text-center .item').length).toBe(1)
        expect(enzymeWrapper.find('.text-center .item').first().text()).toEqual("9")
        
        expect(enzymeWrapper.find('.col-md-2 .col-xs-2 .col-md-offset-1 .col-xs-offset-1').exists()).toBe(true)
        expect(enzymeWrapper.find('.thumbnail').exists()).toBe(true)
        expect(enzymeWrapper.find('.thumbnail .matching-item').exists()).toBe(false)
        expect(enzymeWrapper.find('.thumbnail .winning-item').exists()).toBe(false)
    })
})
