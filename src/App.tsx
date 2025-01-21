import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const TodoFinder = () => {
	const [text, setText] = useState(`Example todos:
- [ ] Task 1 not done
- [x] Task 2 is done
- [ ] Urgent task 3!
- [x] Another urgent one!
- [ ] Regular task 4
- [x] Urgent completed!`);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [todos, setTodos] = useState([]);
	const [stats, setStats] = useState({
		total: 0,
		completed: 0,
		pending: 0,
		urgent: 0,
		percentComplete: 0,
	});

	const getProgressColor = (percent) => {
		if (percent === 100) return "bg-green-500";
		if (percent >= 75) return "bg-emerald-500";
		if (percent >= 50) return "bg-blue-500";
		if (percent >= 25) return "bg-yellow-500";
		return "bg-rose-500";
	};

	const updateStats = (todosArray) => {
		const completed = todosArray.filter((todo) => todo.done).length;
		const total = todosArray.length;
		const urgent = todosArray.filter((todo) => todo.isUrgent).length;
		setStats({
			total,
			completed,
			pending: total - completed,
			urgent,
			percentComplete: total > 0 ? Math.round((completed / total) * 100) : 0,
		});
	};

	const findTodos = (shouldOpenDialog = false) => {
		const todoPattern = /- \[([ x])\] (.*?)(?=\n|$)/g;
		const matches = [...text.matchAll(todoPattern)];

		const foundTodos = matches.map((match, index) => {
			const todoText = match[2];
			const isUrgent = todoText.endsWith("!");
			const displayText = isUrgent ? todoText.slice(0, -1) : todoText;

			return {
				id: index,
				done: match[1] === "x",
				text: todoText,
				displayText,
				isUrgent,
				fullMatch: match[0],
				start: match.index,
				end: match.index + match[0].length,
			};
		});

		setTodos(foundTodos);
		updateStats(foundTodos);
		if (shouldOpenDialog && foundTodos.length > 0) {
			setDialogOpen(true);
		}
	};

	useEffect(() => {
		findTodos();
	}, []);

	const toggleTodo = (todoId) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === todoId) {
				const beforeText = text.substring(0, todo.start);
				const afterText = text.substring(todo.end);
				const urgentMark = todo.isUrgent ? "!" : "";
				const newTodoText = `- [${!todo.done ? "x" : " "}] ${todo.displayText}${urgentMark}`;
				setText(beforeText + newTodoText + afterText);

				return { ...todo, done: !todo.done };
			}
			return todo;
		});
		setTodos(updatedTodos);
		updateStats(updatedTodos);
	};

	const toggleUrgent = (todoId) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === todoId) {
				const beforeText = text.substring(0, todo.start);
				const afterText = text.substring(todo.end).replace(/^!+/, ""); // Remove any accumulated ! at the start
				const hasNewline = afterText.startsWith("\n");
				const newIsUrgent = !todo.isUrgent;
				// Clean the display text by removing any trailing ! marks
				const cleanDisplayText = todo.displayText.replace(/!+$/, "");
				const newDisplayText = newIsUrgent
					? `${cleanDisplayText}!`
					: cleanDisplayText;
				const newTodoText = `- [${todo.done ? "x" : " "}] ${newDisplayText}${hasNewline ? "" : "\n"}`;
				setText(beforeText + newTodoText + afterText);

				return {
					...todo,
					isUrgent: newIsUrgent,
					text: newDisplayText,
					displayText: todo.displayText,
				};
			}
			return todo;
		});
		setTodos(updatedTodos);
		updateStats(updatedTodos);
	};

	return (
		<div className="w-full max-w-2xl space-y-4 mx-auto mt-8">
			<div className="space-y-2">
				<Textarea
					value={text}
					onChange={(e) => {
						setText(e.target.value);
						findTodos();
					}}
					className="h-[250px] font-mono"
					placeholder="Enter your markdown text with todos..."
				/>
			</div>

			<Button onClick={() => findTodos(true)}>Show Todos</Button>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-xl">
					<DialogHeader>
						<DialogTitle className="text-xl mb-4">Todo List</DialogTitle>
						<Card className="p-4 bg-gradient-to-br from-slate-50 to-white space-y-3">
							<div className="flex justify-between items-center">
								<div className="text-sm font-medium">Progress</div>
								<div
									className={`flex items-center gap-1.5 text-sm font-medium
                  ${
										stats.percentComplete === 100
											? "text-green-600"
											: stats.percentComplete >= 75
												? "text-emerald-600"
												: stats.percentComplete >= 50
													? "text-blue-600"
													: stats.percentComplete >= 25
														? "text-yellow-600"
														: "text-rose-600"
									}`}
								>
									{stats.percentComplete}%
									{stats.percentComplete === 100 && (
										<CheckCircle2 className="w-4 h-4 text-green-500" />
									)}
								</div>
							</div>

							<div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
								<div
									className={`h-full transition-all duration-500 ${getProgressColor(stats.percentComplete)}`}
									style={{ width: `${stats.percentComplete}%` }}
								/>
							</div>

							<div className="grid grid-cols-2 gap-3 text-sm">
								<div className="flex justify-between items-center p-2 rounded-lg bg-blue-50">
									<span className="text-blue-700">Total</span>
									<span className="font-medium text-blue-900">
										{stats.total}
									</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg bg-green-50">
									<span className="text-green-700">Completed</span>
									<span className="font-medium text-green-900">
										{stats.completed}
									</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg bg-yellow-50">
									<span className="text-yellow-700">Pending</span>
									<span className="font-medium text-yellow-900">
										{stats.pending}
									</span>
								</div>
								<div className="flex justify-between items-center p-2 rounded-lg bg-rose-50">
									<span className="text-rose-700">Urgent</span>
									<span className="font-medium text-rose-900">
										{stats.urgent}
									</span>
								</div>
							</div>
						</Card>
					</DialogHeader>

					<div className="space-y-3 pt-4">
						{todos.map((todo) => (
							<div key={todo.id} className="flex items-center space-x-2">
								<Checkbox
									id={`todo-${todo.id}`}
									checked={todo.done}
									onCheckedChange={() => toggleTodo(todo.id)}
								/>
								<Label
									htmlFor={`todo-${todo.id}`}
									className={`text-sm flex-grow ${todo.done ? "line-through text-slate-500" : ""}`}
								>
									{todo.displayText.includes(":") ? (
										<>
											<code className="px-1.5 py-0.5 bg-slate-100 rounded text-sm font-mono">
												{todo.displayText.split(":")[0]}
											</code>
											:{todo.displayText.split(":")[1]}
										</>
									) : (
										todo.displayText
									)}
								</Label>
								<Badge
									variant={todo.isUrgent ? "destructive" : "outline"}
									className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
									onClick={() => toggleUrgent(todo.id)}
								>
									{todo.isUrgent ? (
										<>
											<AlertTriangle className="h-3 w-3" />
											Urgent
										</>
									) : (
										"Mark Urgent"
									)}
								</Badge>
							</div>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TodoFinder;
