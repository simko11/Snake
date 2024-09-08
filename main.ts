namespace SpriteKind {
    export const Car = SpriteKind.create()
    export const Body = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadVertical, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Up`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Top))
})
scene.onOverlapTile(SpriteKind.Car, assets.tile`Straße_Unten`, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Down`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Bottom))
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Strasse_Rechts`, function (sprite, location) {
    game.gameOver(false)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Direction != 4) {
        Direction = 3
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Direction != 1) {
        Direction = 2
    }
})
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadTurn2, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Left`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Left))
})
scene.onOverlapTile(SpriteKind.Player, sprites.vehicle.roadVertical, function (sprite, location) {
    game.gameOver(false)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Direction != 3) {
        Direction = 4
    }
})
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadTurn4, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Up`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Top))
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Straße_Unten`, function (sprite, location) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.vehicle.roadHorizontal, function (sprite, location) {
    game.gameOver(false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Direction != 2) {
        Direction = 1
    }
})
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadTurn1, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Down`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Bottom))
})
scene.onOverlapTile(SpriteKind.Car, assets.tile`Strasse_Rechts`, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Right`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Right))
})
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadTurn3, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Right`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Right))
})
scene.onOverlapTile(SpriteKind.Car, sprites.vehicle.roadHorizontal, function (sprite, location) {
    pause(500)
    animation.runImageAnimation(
    Car,
    assets.animation`Car-Drive-Left`,
    150,
    true
    )
    tiles.placeOnTile(Car, location.getNeighboringLocation(CollisionDirection.Left))
})
let i = 0
let DirectionChange = 0
let Car: Sprite = null
let Direction = 0
info.setScore(0)
tiles.setCurrentTilemap(tilemap`Level`)
Direction = 1
let list: Sprite[] = []
let Apple = sprites.create(assets.image`Apple`, SpriteKind.Food)
Car = sprites.create(assets.image`meinBild0`, SpriteKind.Car)
tiles.placeOnRandomTile(Apple, sprites.castle.tileGrass1)
tiles.placeOnTile(Car, tiles.getTileLocation(17, 14))
let Head = sprites.create(assets.image`Head_right`, SpriteKind.Player)
let Body1 = sprites.create(assets.image`Body_Horizontal`, SpriteKind.Player)
let Body2 = sprites.create(assets.image`Body_Horizontal`, SpriteKind.Player)
tiles.placeOnTile(Head, tiles.getTileLocation(10, 10))
tiles.placeOnTile(Body1, Head.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
tiles.placeOnTile(Body2, Body1.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
list.unshift(Body2)
list.unshift(Body1)
list.unshift(Head)
scene.cameraFollowSprite(list[0])
game.onUpdateInterval(200, function () {
    DirectionChange = 0
    if (Direction == 1) {
        Head = sprites.create(assets.image`Head_right`, SpriteKind.Player)
        tiles.placeOnTile(Head, tiles.getTileLocation(list[0].tilemapLocation().column + 1, list[0].tilemapLocation().row))
        DirectionChange += 1
    } else if (Direction == 2) {
        Head = sprites.create(assets.image`Head_left`, SpriteKind.Player)
        tiles.placeOnTile(Head, tiles.getTileLocation(list[0].tilemapLocation().column - 1, list[0].tilemapLocation().row))
        DirectionChange += 1
    } else if (Direction == 3) {
        Head = sprites.create(assets.image`Head_up`, SpriteKind.Player)
        tiles.placeOnTile(Head, tiles.getTileLocation(list[0].tilemapLocation().column, list[0].tilemapLocation().row - 1))
        DirectionChange += 1
    } else if (Direction == 4) {
        Head = sprites.create(assets.image`Head_down`, SpriteKind.Player)
        tiles.placeOnTile(Head, tiles.getTileLocation(list[0].tilemapLocation().column, list[0].tilemapLocation().row + 1))
        DirectionChange += 1
    }
    if (list[0].tilemapLocation().column == Apple.tilemapLocation().column && list[0].tilemapLocation().row == Apple.tilemapLocation().row) {
        sprites.destroy(Apple, effects.fountain, 100)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        info.changeScoreBy(1)
        list[0].setImage(assets.image`Body_Horizontal`)
        list.unshift(Head)
        Apple = sprites.create(assets.image`Apple`, SpriteKind.Food)
        tiles.placeOnRandomTile(Apple, sprites.castle.tileGrass1)
    } else {
        if (DirectionChange > 0) {
            list[0].setImage(assets.image`Body_Horizontal`)
            list.unshift(Head)
        }
        sprites.destroy(list.pop())
    }
    scene.cameraFollowSprite(list[0])
    i = 1
    for (let index = 0; index < list.length - 1; index++) {
        if (list[0].tilemapLocation().column == list[i].tilemapLocation().column && list[0].tilemapLocation().row == list[i].tilemapLocation().row) {
            game.gameOver(false)
        }
        i += 1
    }
})
