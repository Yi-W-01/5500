import {findAllTuits, findTuitById, createTuit, deleteTuit, deleteTuitByUserId} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('createTuit', () => {
    // dummy user
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert
    const sampleTuit = {
        tuit: 'I love this tuit',
        postedBy: ''
    }
    let dummyUser = "";

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        dummyUser = await createUser(ripley);
        sampleTuit.postedBy = dummyUser._id;
        return deleteTuitByUserId(sampleTuit.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitByUserId(sampleTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can insert new tuit with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(dummyUser._id, sampleTuit);
        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
    });
});

describe('deleteTuit', () => {
    // dummy user
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert
    const sampleTuit = {
        tuit: 'I love this tuit',
        postedBy: ''
    }
    let dummyUser = "";
    let newTuit = "";

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        dummyUser = await createUser(ripley);
        sampleTuit.postedBy = dummyUser._id;
        newTuit = await createTuit(dummyUser._id, sampleTuit);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitByUserId(sampleTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can delete tuit wtih REST API', async () => {
        // delete a tuit by its id. Assumes tuit already exists
        const status = await deleteTuit(newTuit._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('findTuitById', () => {
    // dummy user
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert
    const sampleTuit = {
        tuit: 'I love this tuit',
        postedBy: ''
    }
    let dummyUser = "";
    let newTuit = "";

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        dummyUser = await createUser(ripley);
        sampleTuit.postedBy = dummyUser._id;
        newTuit = await createTuit(dummyUser._id, sampleTuit);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitByUserId(sampleTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // delete a tuit by its id. Assumes tuit already exists
        const existingTuit = await findTuitById(newTuit._id);

        // verify we deleted at least one user by their username
        expect(existingTuit.tuit).toEqual(sampleTuit.tuit);
    });
});

describe('findAllTuits', () => {
    // dummy user
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert
    const tuits = ["I love this tuit", "tuit 2", "tuit 3"];
    let dummyUser = "";

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        dummyUser = await createUser(ripley);
        tuits.map(tuit =>
            createTuit(dummyUser._id,
                {
                    tuit: tuit,
                    postedBy: dummyUser._id,
                })
        )
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        tuits.map(tuit =>
            deleteTuitByUserId(dummyUser._id)
        )
        return deleteUsersByUsername(ripley.username);
    })

    test('can retrieve all tuits with REST API', async () => {
        // retrieve all the users
        const allTuits = await findAllTuits();

        // there should be a minimum number of tuits
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitName = tuits.find(tuitName => tuitName === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitName);
        });
    });
});