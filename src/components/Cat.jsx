/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 cat.gltf
*/

import React, { useEffect, useRef,useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Cat(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/cat.gltf')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log(actions)
    actions.idle.play()
    actions.blink.play()
  })
  const [time, setTime] = useState(0);

  useEffect(() => {

    // Start the timer
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  
useEffect(() => {
  actions.close.play()
}, [time])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig">
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <group name="cat002">
            <skinnedMesh name="Cube013" geometry={nodes.Cube013.geometry} material={materials.black} skeleton={nodes.Cube013.skeleton} morphTargetDictionary={nodes.Cube013.morphTargetDictionary} morphTargetInfluences={nodes.Cube013.morphTargetInfluences} />
            <skinnedMesh name="Cube013_1" geometry={nodes.Cube013_1.geometry} material={materials.cat} skeleton={nodes.Cube013_1.skeleton} morphTargetDictionary={nodes.Cube013_1.morphTargetDictionary} morphTargetInfluences={nodes.Cube013_1.morphTargetInfluences} />
            <skinnedMesh name="Cube013_2" geometry={nodes.Cube013_2.geometry} material={materials.pink} skeleton={nodes.Cube013_2.skeleton} morphTargetDictionary={nodes.Cube013_2.morphTargetDictionary} morphTargetInfluences={nodes.Cube013_2.morphTargetInfluences} />
            <skinnedMesh name="Cube013_3" geometry={nodes.Cube013_3.geometry} material={materials.white} skeleton={nodes.Cube013_3.skeleton} morphTargetDictionary={nodes.Cube013_3.morphTargetDictionary} morphTargetInfluences={nodes.Cube013_3.morphTargetInfluences} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/cat.gltf')
