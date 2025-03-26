using System.Reflection;

namespace DotriStack.AuthCenter.Infrastructure;

public static class AssemblyReference
{
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}