import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import flatten from 'lodash-es/flatten'
import { SVGLoader as loader } from './SVGLoader'
import './styles.css'

const svgResource = new Promise(resolve =>
  new loader().load('https://raw.githubusercontent.com/drcmda/react-three-fiber/master/examples/resources/images/svg/night.svg', shapes =>
    resolve(flatten(shapes.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
  )
)

function Shape({ shape, position, color, opacity, index }) {
  return (
    <mesh position={[0, 0, -index * 50]}>
      <meshPhongMaterial attach="material" color={color} side={THREE.DoubleSide} />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
  )
}

function Scene() {
  const [shapes, set] = useState([])
  useEffect(() => void svgResource.then(set), [])
  return (
    <group position={[1600, -700, 0]} rotation={[0, THREE.Math.degToRad(180), 0]}>
      {shapes.map(item => (
        <Shape key={item.shape.uuid} {...item} />
      ))}
    </group>
  )
}

function App() {
  return (
    <div class="main">
      <Canvas
        camera={{
          fov: 80,
          position: [0, 0, 2000],
          rotation: [0, THREE.Math.degToRad(-20), THREE.Math.degToRad(180)],
          far: 20000
        }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Scene />
      </Canvas>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
