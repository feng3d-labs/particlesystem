namespace editor
{
    createObjectMenu.push(
        {
            label: "粒子系统", click: () =>
            {
                hierarchy.addGameObject(feng3d.GameObject.createPrimitive("Particle System"));
            }
        },
    );
}