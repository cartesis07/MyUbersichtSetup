/**
 * Copyright 2019 Roland Schaer
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { React } from 'uebersicht';

import Error from './src/components/Error.jsx';
import Stats from './src/components/Stats.jsx';

/**
 * Configuration values
 */
const config = {
    /* Enable animations */
    animations: true,
    /* Available stat keys, in order of rendering */
    stats: [
        'cpu.cpu-temp',
        'extra.tcgc-peci-gpu-temp',
        'fan.fan-0-speed',
        'fan.fan-1-speed',
        'battery.current-charge'
    ],
    /* Temperature unit, either 'C' or 'F' */
    tempUnit: 'C',
    /* Widget position (absolute) */
    top: '800px',
    left: '1050px',
    /* Stat position */
    width: '125',
    height: '60',
    radius: '25',
    strokeWidth: '2',
    /* Stat  color */
    color: '#ffffff',
    /* Stat icon sizes */
    iconSize: '1.5rem',
    iconLineHeight: '3.5rem',
    /* Stat label size */
    labelSize: '0.85rem'
};

/**
 * Widget command
 */
export const command = '/usr/local/bin/istats';

/**
 * Widget refresh frequency in milliseconds
 */
export const refreshFrequency = 1000;

export const className = `
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue';
    font-size: 16px;
    color: ${config.color};
    top: ${config.top};
    left: ${config.left};
`;

const isEmpty = (value) => {
    return (!value || Object.keys(value).length === 0 && (value).constructor === Object);
}

const renderError = (error) => {
    if (isEmpty(error)) return ('');
    return <Error error={error} />
}

const renderStats = (output) => {
    if (isEmpty(output)) return ('');
    return <Stats output={output} config={config} />
};

export const render = ({output, error}) => {
    return error ? renderError(error) : renderStats(output);
};
