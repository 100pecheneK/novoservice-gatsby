import React from "react"
import Layout from "./src/components/Layout"
import './src/styles/globals.css'

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
