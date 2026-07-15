class MemoryRepository {
    constructor() {
        this.tasks = [
            {
                id: 0,
                title: "Learn JavaScript",
                done: false,
            },
            {
                id: 1,
                title: "Finish Assignment",
                done: true,
            },
            {
                id: 2,
                title: "Check Emails",
                done: false,
            },
        ];
    }

    getAll() {
        return this.tasks;
    }

    getById(id) {
        return this.tasks.find(task => task.id === id);
    }

    create(title) {
        const newTask = {
            id: this.tasks.length,
            title,
            done: false,
        };

        this.tasks.push(newTask);
        return newTask;
    }

    update(id, data) {
        const task = this.getById(id);

        if (!task) return null;

        if (data.title !== undefined) {
            task.title = data.title;
        }

        if (data.done !== undefined) {
            task.done = data.done;
        }

        return task;
    }

    delete(id) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }
}

module.exports = MemoryRepository;