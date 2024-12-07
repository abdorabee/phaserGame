 Phaser Game Project - Seed Planting Game

This project is an introductory game developed using the Phaser framework. The game consists of an introduction scene with a splash screen and loading animation, followed by the first level where the player plants seeds correctly.

## Features

### 1. **Introduction Scene:**
- **Splash Screen:** Displays the game's logo and theme for a few seconds before starting the loading scene.
- **Loading Animation:** Shows a progress bar to indicate when assets are loading.
- **Loading Text:** Displays "Loading..." to provide feedback while the assets are being loaded.

### 2. **Main Scene (Level 1):**
- **Objective:** The player's goal is to drag seeds and place them on the designated brown slots on the game field. 
  - If the seed is placed correctly, it disappears and a plant appears in its place.
  - If a non-seed object is placed incorrectly, the seed returns to its original position with a warning sound.
  
- **Drag-and-Drop Mechanics:** 
  - Seeds are draggable using the mouse or touch.
  - Correct placement triggers a "success" sound and the seed is replaced by a plant.
  - Incorrect placement triggers an "error" sound and the seed returns to its starting position.

### 3. **Visual and Audio Enhancements:**
- **Animations:** 
  - Seeds disappear with a fading effect when placed correctly.
  - Plants appear at the seed's location with a scaling effect to simulate growth.
  
- **Sound Effects:**
  - Sound plays when the player drags, places seeds correctly, or places them incorrectly.
  
