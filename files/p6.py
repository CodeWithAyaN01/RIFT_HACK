# Program 6: Locally Weighted Regression (LWR)

import numpy as np
import matplotlib.pyplot as plt

def gaussian_kernel(x, xi, tau):
    return np.exp(-np.sum((x - xi) ** 2) / (2 * tau ** 2))

def locally_weighted_regression(x, X, y, tau):
    m = X.shape[0]

    # Compute weights
    weights = np.array([gaussian_kernel(x, X[i], tau) for i in range(m)])
    W = np.diag(weights)

    # Compute theta
    X_transpose_W = X.T @ W
    theta = np.linalg.inv(X_transpose_W @ X) @ X_transpose_W @ y

    # Predict value at x
    return x @ theta

# Generate synthetic data
np.random.seed(42)

X = np.linspace(0, 2 * np.pi, 100)
X_bias = np.c_[np.ones(X.shape), X]

y = np.sin(X) + 0.1 * np.random.randn(100)

# Test points
x_test = np.linspace(0, 2 * np.pi, 200)
x_test_bias = np.c_[np.ones(x_test.shape), x_test]

# Bandwidth parameter
tau = 0.5

# Predictions
y_pred = np.array([
    locally_weighted_regression(xi, X_bias, y, tau)
    for xi in x_test_bias
])

# Plot results
plt.figure(figsize=(10, 6))

plt.scatter(
    X,
    y,
    color='red',
    label='Training Dataset',
    alpha=0.7
)

plt.plot(
    x_test,
    y_pred,
    color='blue',
    label=f'LWR Fit (tau={tau})',
    linewidth=2,
    alpha=0.7
)

plt.xlabel('X', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.title('Locally Weighted Regression', fontsize=14)

plt.legend()
plt.grid()
plt.show()