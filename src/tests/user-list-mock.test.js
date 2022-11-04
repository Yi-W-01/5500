import axios from "axios";
import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {UserList} from "../components/profile/user-list";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]
jest.mock('axios');

// test rendering from Mock
test('user list renders mocked', async () => {
    // simulate response from REST with static response
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));
    const response = await findAllUsers();
    // retrieve users from Mock
    const users = response.users;

    // render users retrieved from
    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);
    // verify user appears in screen somewhere
    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
});