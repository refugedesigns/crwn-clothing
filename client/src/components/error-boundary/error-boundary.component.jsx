import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        
        return { hasError: true}
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    render() {
        return this.state.hasError ? <div>Something went wrong</div> : this.props.children
    }
}
