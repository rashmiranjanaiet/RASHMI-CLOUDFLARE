import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const KEYWORD_CATEGORIES = [
    { title: 'IMPORTANT KEYWORDS', keywords: '' },
    { title: 'Data types', keywords: 'int · float · double · char · boolean · byte · short · long' },
    { title: 'Conditions', keywords: 'if · else · switch · case · default' },
    { title: 'Loops', keywords: 'for · while · do · break · continue' },
    { title: 'OOP', keywords: 'class · object (not a keyword) · this · super · new · extends · implements · interface' },
    { title: 'Access modifiers', keywords: 'public · private · protected' },
    { title: 'Exception handling', keywords: 'try · catch · finally · throw · throws' },
    { title: 'Methods', keywords: 'void · return · static · abstract · final' },
    { title: 'Packages', keywords: 'package · import' },
];

const CABIN_SKETCH_URL = '/fonts/CabinSketch-Regular.ttf';
const CATEGORY_SPACING = 7.5;
const CATEGORY_START_OFFSET = 7;
const FLOAT_HEIGHT = -0.5;

const JavaKeywordsRoad = ({ zOffset }) => {
    const categoryRefs = useRef([]);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        categoryRefs.current.forEach((group, index) => {
            if (!group) return;
            group.position.y = FLOAT_HEIGHT + Math.sin(time * 0.75 + index * 0.8) * 0.035;
            group.rotation.z = Math.sin(time * 0.45 + index) * 0.008;
        });
    });

    return KEYWORD_CATEGORIES.map((category, index) => (
        <group
            key={category.title}
            ref={group => { categoryRefs.current[index] = group; }}
            position={[0, FLOAT_HEIGHT, zOffset - CATEGORY_START_OFFSET - index * CATEGORY_SPACING]}
            scale={0.05}
        >
            <Text
                position={[0, 0.3, 0]}
                fontSize={0.45}
                font={CABIN_SKETCH_URL}
                color="#383838"
                anchorX="center"
                anchorY="middle"
                maxWidth={3}
                textAlign="center"
            >
                {category.title}
            </Text>
            {category.keywords && (
                <Text
                    position={[0, -0.12, 0]}
                    fontSize={0.16}
                    font={CABIN_SKETCH_URL}
                    color="#4b4b4b"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3}
                    lineHeight={1.25}
                    textAlign="center"
                >
                    {category.keywords}
                </Text>
            )}
        </group>
    ));
};

export default JavaKeywordsRoad;
